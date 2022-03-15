
  
import useMediaQuery from '../utils/screensize'

export default function LoadingScreen(){
  const isMobile = useMediaQuery('(max-width: 700px)');
  const isTablet = useMediaQuery('(max-width: 1025px)');
  const background = isMobile ? 'https://c.tenor.com/S9-UWYYtixAAAAAM/ken-fighting-stance.gif' : 'https://i.pinimg.com/originals/ee/78/4f/ee784f0d96fa6c0fc6ee6c54c8eba3df.gif'
  

  return (
    <div className="container character-select-container">
      <div  style={isMobile? {marginTop: '5rem'}: isTablet? {marginTop: '5rem'}: {paddingTop: '-2%', marginLeft:'5rem',width: '80vw'}} className="row justify-content-center">
        <img width={400}src={background}></img>
      </div>
    </div>
  )
}