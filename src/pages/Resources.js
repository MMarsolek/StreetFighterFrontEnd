import React from 'react';
import { TwitterTimelineEmbed} from 'react-twitter-embed';
import useMediaQuery from '../utils/screensize'
import background from '../styles/images/redandblue.jpg'

export default function Resources () {
  const isMobile = useMediaQuery('(max-width: 700px)');
  const isTablet = useMediaQuery('(max-width: 1025px)');

  const twitterSetting = {
    width: isMobile ? 400 : isTablet? 400: 400,
    height: isMobile ? 250 : isTablet ? 350: 750
  }
  const containerSetting = {
    marginTop: isMobile ? '3.7rem' : '3.9rem',
    paddingTop: isMobile? '2rem' : '1rem',
    paddingBottom: isMobile? '0' : '.78rem',
    display: 'flex',
    justifyContent: 'space-evenly',
    justifySelf: 'center',
    flexDirection: isTablet ? 'column':'row',
    width: '60%',
    backgroundColor: '#f8fcffda',
    textDecoration: 'none',
    color: 'black',
    textAlign: 'center',
    border: 'darkgrey solid 1px',

  }

  const myStyle={
    minHeight: '100vh',
    background: `url(${background})`,
    backgroundPosition: 'center',
    display:'flex',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    justifyContent: 'center',
  };

  const infoListStyle = {
    textDecoration: 'none',
    color: 'black', 
    margin: isTablet ? '2.5rem 2rem' :'2rem 2rem',
    marginBottom: '0',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: isMobile ? '80%': isTablet ? '75%':'25%',
  }

  return (
    <div style={myStyle}>
    <div style={containerSetting}> 
      <section  style={infoListStyle}>
        <section>
          <a href='https://us.streetfighter.com/' className='button' target={'_blank'} rel={'noreferrer'}> 
            <h4>The official site </h4>
          </a>
          <p style={{fontSize:'medium', paddingTop:'0'}}>
              The official CapCom site for Street Fighter V. This site has a variety of beginner-friendly info, as well as links to merchandise and trailers.
          </p>
          </section>
        <section>
      <a href='https://wiki.supercombo.gg/w/Street_Fighter_V' className='button' target={'_blank'}> 
        <h4>Community Wiki</h4>
      </a>
      <p style={{fontSize:'medium', paddingTop:'0'}}>
          This community-maintained site is a great source for data on all of SFV's characters.
        </p>
        </section>
        <section>
      <a href='https://fullmeter.com/' className='button' target={'_blank'}> 
      <h4>Character frame data</h4>
      </a>
        <p style={{fontSize:'medium', paddingTop:'0'}}>
        This site (also available as a mobile app) provides in-depth frame data breakdowns for every member of SFV's cast.
        </p>
        </section>
      </section>
      <TwitterTimelineEmbed 
        sourceType="https://twitter.com/StreetFighter?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
        screenName="StreetFighter"
        options={twitterSetting}
      />
    </div>
    </div>
  );
}
