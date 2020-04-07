const User = require('../models/user');
const { comparePassword } = require('../infra/encryption');
const { createJwt,createRefreshToken } = require('../infra/jwt');
const tokenList = {}
/**
 * @apiGroup User
 * @api {POST} /api/users Create new User
 * @apiDescription Creates a new User
 * @apiPermission None
 * @apiParam {String} name : Name of the user    (REQUIRED)
 * @apiParam {String} email : User's emailId    (REQUIRED)
 * @apiParam {String} password : User's password    (REQUIRED)
 * @apiParam {Date} graduationDate : The date of the user's graduation
 * @apiParam {String} bio : Biography/Description of user
 * @apiParam {ObjectId} currentSchool : _id of Tag (The users current university/school)
 * @apiParam [{ObjectId}] accepts : Array of _id of Tag (Accept's into universities)
 * @apiParam [{ObjectId}] rejects : Array of _id of Tag (Reject's by universities)
 * @apiParam [{ObjectId}] pinnedQuestions : Array of _id of Tag (Questions pinned by User)
 * @apiParam {String} githubUrl : User's gitHub Url
 * @apiParam {String} facebookUrl : User's facebook Url
 * @apiParam {String} linkedinUrl: User's linkedIn Url
 * @apiParam {String} twitterUrl : User's twitter Url
 * @apiParam {Buffer} avatar : Profile Photo
 * @apiParam [{String}] role : Role played by user(Admin,user,etc.)
 * @apiParam [{ name :  String,
                date : Date,
                score : Number }] testTimeline :Array of objects(Timeline of tests appeared)
 * @apiParam [{ObjectId}] domains : Array of _id of Tag (Domains of the user's interest)
 * @apiParam [{ObjectId}] tagFollows : Array of _id of Tag (Tags followed by the user)
 * @apiSuccess (201) All the mentioned fields in the request except the password and avatar
 */
exports.register = async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      msg: 'User already exists, try logging in!'
    });
  }

  const user = await new User(req.body);
  const token = await user.newAuthToken();
  const refreshToken = await createRefreshToken({ _id: user.id});
  tokenList[refreshToken] = {id:user.id ,refreshToken:refreshToken}
  await user.save()
  const userObject = user.getPublicProfile()
  return res.status(201).send({ userObject, token ,refreshToken });
};

/**
 * @apiGroup User
 * @api {POST} /api/users/login 
 * @apiDescription Used to Login current user
 * @apiPermission None
 * @apiParam {String} email : User's emailId    (REQUIRED)
 * @apiParam {String} password : User's password    (REQUIRED)
 * @apiSuccess (200) Users Profile details
 * @apiSuccess (200) {String} token JWT Token
 * @apiSuccess (200) {String} refreshToken JWT Refresh Token
 **/
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      msg: 'User email not found.'
    });
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      msg: "User password didn't match."
    });
  }

  const token = await user.newAuthToken();
  const refreshToken = await createRefreshToken({ _id: user.id });
  tokenList[refreshToken] = {id:user.id ,refreshToken:refreshToken}
  const userObject = user.getPublicProfile()
  return res.send({userObject, token, refreshToken });
};

/**
 * @apiGroup User
 * @api {POST} /api/users/refresh 
 * @apiDescription Issues a JWT token using requestToken
 * @apiPermission None
 * @apiParam {String} refreshToken : JWT Refresh Token    (REQUIRED)
 * @apiSuccess (200) {String} token JWT Token
 **/
exports.refresh = async (req, res) => {
    if((req.body.refreshToken) && (req.body.refreshToken in tokenList)) {
        const token = await createJwt({ _id: tokenList[req.body.refreshToken].id })
        res.status(200).send({
            token : token
        })
    }else{
        res.status(404).send({msg:'Invalid request'})
    }
};

/**
 * @apiGroup User
 * @api {GET} /api/users/me 
 * @apiDescription Issues a JWT token using requestToken
 * @apiPermission LoggedIn
 * @apiParam None
 * @apiSuccess (200) LoggedIn user's Profile details
 **/
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json(user.getPublicProfile());
};

/**
 * @apiGroup User
 * @api {PUT} /api/users/me 
 * @apiDescription Update the user's profile
 * @apiPermission LoggedIn
 * @apiParam The paramers that need to be updated(Same as request for register)
 * @apiSuccess (200) User's updated profile details
 **/
exports.updateProfile = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id,req.body,{
    new : true
  });
  return res.json(user.getPublicProfile());
};  

/**
 * @apiGroup User
 * @api {GET} /api/users/:id 
 * @apiDescription Get user by id
 * @apiPermission None
 * @apiParam {String} : id of the required user   (REQUIRED)
 * @apiSuccess (200) User's Profile details 
 **/
exports.getById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
  }

  return res.json(user.getPublicProfile());
};

/**
 * @route POST "/api/users/upload"
 */
/**
 * @apiGroup User
 * @api {POST} /api/users/upload 
 * @apiDescription Upload Profile Photo
 * @apiPermission LoggedIn
 * @apiParam {FILE} A jpg/jpeg/png image    (REQUIRED)
 * @apiSuccess (200) msg containing value "Profile photo uploaded successfully"
 **/
exports.uploadProfilePhoto = async (req, res) => {
  req.user.avatar = req.file.buffer
  await req.user.save()
  res.status(200).send({
    msg : 'Profile photo uploaded successfully'
  })
};

/**
 * @apiGroup User
 * @api {GET} /api/users/:id/avatar 
 * @apiDescription Get user's profile photo
 * @apiPermission LoggedIn
 * @apiParam {String} id: Id of the user    (REQUIRED)
 * @apiSuccess (200) The user's profile photo
 **/
exports.getProfilePhoto = async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user || !user.avatar) {
    res.status(404).send();
  }
  res.set('Content-Type','image/jpg')
  res.send(user.avatar)
};