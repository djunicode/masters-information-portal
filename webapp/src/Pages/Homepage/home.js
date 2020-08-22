import React from 'react';
import AOS from 'aos';
import "aos/dist/aos.css";
import './homepage.css';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Cookies from 'js-cookie';
import {Link} from 'react-router-dom';
import {ReactComponent as HeadingImg} from '../../assets/svg/HeaderImg.svg';
import Img1 from '../../assets/images/image1.png';
import Img2 from '../../assets/images/image2.png';
import Img3 from '../../assets/images/image3.png';
import Img4 from '../../assets/images/image4.png';
import Img5 from '../../assets/images/image5.png';

export default function Home(props){
	const[loggedIn,setLoggedIn]=React.useState(false);
	const[greetText,setText] = React.useState("Join");
	// eslint-disable-next-line
	React.useEffect(()=>{
		if(!!Cookies.get('jwt')){
			setLoggedIn(true)
		}
		else{
			setLoggedIn(false)
		}
		if(loggedIn){
			setText("");
		}
		else{
			setText("Join")
		}
		AOS.init({
			'duration':1500,
			'mirror':true,
			'anchorPlacement':'center-bottom'
		});
		let scrollRef = 0;
		window.addEventListener('scroll', function() {
		  // increase value up to 10, then refresh AOS
		  scrollRef <= 10 ? scrollRef++ : AOS.refresh();
		});
		window.scrollTo(0,0)
	})
	return(
		<div className="homepage-body">
			<div className="home-header">
				<Grid container>
			      	<Grid item md={6}>
		      			<Typography variant="h2" style={{marginLeft:'7vw'}}>
		      				{greetText}<br/> Masters Information<br/> Portal
		      			</Typography>
		      			<Hidden smDown implementation="css">
		      				<br/>
		      			</Hidden>
		      			<div style={{marginLeft:'7vw'}}>
		      				{loggedIn?
		      					<React.Fragment>
				      				<Link to='/chat' style={{textDecoration:'none'}} onClick={()=>props.setHomepage(false)}>
										<Button style={{backgroundColor:'#F4FAF8',borderRadius:25,width:150,color:'#46BC99'}}>
					      					<Typography><b>Chat</b></Typography>
					      				</Button>
				      				</Link>
				      				<Link to='/forum' style={{textDecoration:'none'}} onClick={()=>props.setHomepage(false)}>
					      				<Button style={{border:'2px solid #FAFAF8',borderRadius:25,width:150,marginLeft:30,color:'#F4FAF8'}}>
					      					<Typography><b>Forum</b></Typography>
					      				</Button>
				      				</Link>
					      		</React.Fragment>
			      			:
		      					<React.Fragment>
				      				<Link to='/login' style={{textDecoration:'none'}} onClick={()=>props.setHomepage(false)}>
					      				<Button style={{backgroundColor:'#F4FAF8',borderRadius:25,width:150,color:'#46BC99'}}>
					      					<Typography><b>Login</b></Typography>
					      				</Button>
				      				</Link>
				      				<Link to='/register' style={{textDecoration:'none'}} onClick={()=>props.setHomepage(false)}>
				      					<Button style={{border:'2px solid #FAFAF8',borderRadius:25,width:150,marginLeft:30,color:'#F4FAF8'}}>
					      					<Typography><b>Register</b></Typography>
					      				</Button>
				      				</Link>
		      					</React.Fragment>
				      		}
			      		</div>
		      		</Grid>
			      	<Grid item md={6}>
			      		<div align="center">
			      			<HeadingImg/>
			      		</div>
			      	</Grid>
		      	</Grid>
			</div>
			<div align="center">
			<Grid container alignItems='center' justify="space-evenly">
				<Grid item md={6}>
					<p data-aos="fade-right" className="description">
						Find information about any university. Know what scores you need to get into the university, their average fees and many other details!
					</p>
				</Grid>
				<Grid item md={6}>
					<img src={Img1} data-aos="zoom-in-left" className="description-img" alt="University Preview"/>
				</Grid>
				<Grid item md={6}>
					<Hidden smDown implementation="css">
						<img src={Img2} data-aos="zoom-in-right" className="description-img" alt="Forums Preview"/>
					</Hidden>
					<Hidden smUp implementation="css">
						<p data-aos="fade-right" className="description">
							Ask questions in the forums browsed by various alumnis, and help your friends by answering their questions
						</p>
					</Hidden>
				</Grid>
				<Grid item md={6}>
					<Hidden smUp implementation="css">
						<img src={Img2} data-aos="zoom-in-right" className="description-img" alt="Forums Preview"/>
					</Hidden>
					<Hidden smDown implementation="css">
						<p data-aos="fade-left" className="description">
							Ask questions in the forums browsed by various alumnis, and help your friends by answering their questions
						</p>
					</Hidden>
				</Grid>
				<Grid item md={6}>
					<p data-aos="fade-right" className="description">
						Get information about your followed universities, tags and people directly on your feed!
					</p>
				</Grid>
				<Grid item md={6}>
					<img src={Img3} data-aos="zoom-in-left" className="description-img" alt="User Feed Preview"/>
				</Grid>
				<Grid item md={6}>
					<Hidden smDown implementation="css">
						<img src={Img4} data-aos="zoom-in-right" className="description-img" alt="Forums Preview"/>
					</Hidden>
					<Hidden smUp implementation="css">
						<p data-aos="fade-right" className="description">
							Chat with people! Get to know about their experiences, ask for suggestions or just have a fun time!
						</p>
					</Hidden>
				</Grid>
				<Grid item md={6}>
					<Hidden smUp implementation="css">
						<img src={Img4} data-aos="zoom-in-left" className="description-img" alt="Forums Preview"/>
					</Hidden>
					<Hidden smDown implementation="css">
						<p data-aos="fade-left" className="description">
							Chat with people! Get to know about their experiences, ask for suggestions  or just have a fun time!
						</p>
					</Hidden>
				</Grid>
				<Grid item md={6}>
					<p data-aos="fade-right" className="description">
						Get different resources and share your own to help other fellow students!
					</p>
				</Grid>
				<Grid item md={6}>
					<img src={Img5} data-aos="zoom-in-left" className="description-img" alt="Resources Page Preview"/>
				</Grid>
			</Grid>
			</div>
			<br/><br/>
		</div>
	)
}