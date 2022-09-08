import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import pic1 from '../assets/1.jpg'
import pic2 from '../assets/2.jpg'
// import pic3 from '../assets/3.jpg'
import target from '../assets/target.svg'
// import { Navbar } from '../components/Navbar'
// import {FaCaretRight} from 'react-icons/fa'
import {motion} from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useAnimation } from 'framer-motion'
import axios from 'axios'
export const Home = () => {
  const images = [
    {
      img: pic1
    },
    {
      img: pic2
    }
  ]

  const features = [
    {
      icon: target,
      title: "Create Appointments",
      text: "With Calendee you can schedule simple appointments for Work, School, Church, etc.",
      id: 1
    },
    {
      icon: target,
      title: "Create Appointments",
      text: "With Calendee you can schedule simple appointments for Work, School, Church, etc.",
      id: 2
    },
    {
      icon: target,
      title: "Create Appointments",
      text: "With Calendee you can schedule simple appointments for Work, School, Church, etc.",
      id: 3
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [serverState, setServerState] = useState({submitted: false,status: null});

  const handleServerRes = (ok,msg,form) =>{
    setServerState({submitted:false,status: {ok,msg}})
    if(ok){
      form.reset();
    }
  };

  const handleSubmit = e =>{
    e.preventDefault();
    const form = e.target;
    setServerState({submitted: true})
    axios({
      method: "post",
      url: "https://formspree.io/f/mknegogp",
      data: new FormData(form)
    })
    .then((res)=>{
      handleServerRes(true,"Thanks for Subscribing!",form);
      setTimeout(()=>{
        setServerState({submitted:false})
      },3000)
    })
    .catch((res)=>{
      handleServerRes(false, res.response.data.error,form)
    })
  }

  useEffect(()=>{
    const intervalId = setInterval(() =>{
      if (currentIndex === images.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, 5000);
    return () => clearInterval(intervalId);

  },[currentIndex, images.length])

  const [ref, inView] = useInView({
    threshold: 0.2
  })

  const [mRef,mInView] = useInView({
    threshold: 0.4
  })

  const animation = useAnimation()
  const anime = useAnimation()
  const missionAnime = useAnimation()
  useEffect(()=>{
    if(inView){
      animation.start({
        x: 0,
        transition:{
          type: 'spring',duration: 1.5, bounce: 0.3
        }
      })
      anime.start({
        opacity: 1,
        transition:{
          duration: 1.3
        }
      })
    } 
    if(!inView){
      animation.start({x:'-100vw'})
      anime.start({opacity:0})
    }
    if(mInView){
       missionAnime.start({
        y: 0,
        transition: {
          type: 'spring',duration: 1.5, bounce: 0.3
        }
      })
    }
    if(!mInView){
      missionAnime.start({y: '-800vh'})

    }
  },[inView,animation,anime,mInView,missionAnime])

  return (
    <>
      <div className="home">
        <header className="header">
          <motion.div 
          className="header-text"
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{duration: 1.3}}>
            <h1>Scheduling Made <span>Easy</span></h1>
            <p>Calendee helps in scheduling your appointments on a daily,monthly and yearly basis. It assists in better work flow and smooth scheduling experience.</p>
            
            <form className="form-container" onSubmit={handleSubmit}>
              <input type="email" id="email" name="email" placeholder="Enter your email" required/>
              <button className="submit-btn" type="submit" disabled={serverState.submitted}>
                <p>Subscribe!</p>
                {/* <FaCaretRight /> */}
              </button>
            </form>
              {serverState.status && (
                <p className="join-text">{serverState.status.msg}</p>
              )}
            <p className="mailing">Subscribe to our mailing list 🙂</p>

          </motion.div>
          <motion.div 
          className="header-img"
          initial={{scale:0}}
          animate={{scale:1}}
          transition={{delay: 1.4}}>
            <img src={images[currentIndex].img} alt="vectors" />
          </motion.div>
        </header>

        <section ref={ref} className="feature">
          <motion.h3 
          className="feature-heading"
          animate={anime}
          >Features we Offer</motion.h3>
          <motion.div 
          className="feature-container"
          animate={animation}
          >
            {features.map(({id,title,text,icon})=>(
              <motion.div 
              className="feature-item" 
              key={id}
              whileHover={{scale: 1.1}}>
                <img src={icon} alt="" />
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className='mission' ref={mRef}>
          <motion.h3 
          className='feature-heading'
          animate={missionAnime}
          >Our Mission <motion.span
          initial={{y:0,x:0}}
          animate={{y:-12,x:8}}
          transition={{duration: 2,repeatType: "reverse",repeat: Infinity}}>🚀</motion.span></motion.h3>
          <motion.p 
          className='mission-text'
          animate={missionAnime}
          >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore sed, ea ducimus minus libero tenetur nihil harum, saepe sapiente illo consequuntur excepturi corporis vero aut nesciunt earum itaque molestiae facilis voluptatum. Nam esse minus nulla enim, atque at fuga debitis corporis veniam laudantium dicta deserunt soluta, reprehenderit officia iusto. Veritatis, praesentium architecto alias nihil necessitatibus dolore ipsa eligendi libero vel atque laboriosam voluptatem repellat sequi, molestiae cumque ducimus facere, laborum harum dolorum nesciunt nulla aperiam? Sed maxime magni consequuntur hic!</motion.p>
        </section>

        <section className="started">
          <div className="started-text">
            <h3>Schedule your Appointments with ease on Calendee</h3>
          </div>
          <motion.div 
          className="started-btn"
          whileHover={{scale:1.1}}>
            <Link to="/login">
              Get Started
            </Link>
          </motion.div>
        </section>

        <footer className="footer">
          <h3>&copy; 2022 All Rights Reserved | Temiloluwa.</h3>
        </footer>
      </div>
    </>
    
  )
}
