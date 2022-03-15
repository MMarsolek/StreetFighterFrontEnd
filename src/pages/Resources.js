import React from 'react';
import { TwitterTimelineEmbed} from 'react-twitter-embed';
import useMediaQuery from '../utils/screensize'

export default function Resources () {
  const isMobile = useMediaQuery('(max-width: 700px)');
  const isTablet = useMediaQuery('(max-width: 1025px)');

  const twitterSetting = {
    width: isMobile ? 300 : 400,
    height: isMobile ? 400 : 750
  }
  const containerSetting = {
    paddingTop: '5rem',
    display: 'flex',
    justifyContent: 'space-between',
  }
  const infoListStyle = {
    textDecoration: 'none',
    color: 'black',
    padding: ' 0 2rem',
    display: 'flex',
    justifyContent: 'center',
  }
  return (
    <div style={containerSetting}> 
      <TwitterTimelineEmbed
        sourceType="https://twitter.com/StreetFighter?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
        screenName="StreetFighter"
        options={twitterSetting}
      />
      <section >
      <a href='https://us.streetfighter.com/' style={infoListStyle}> 
        <h4>The official site </h4>
        <p>
          This is where the description will go.This is where the description will go.This is where the description will go.This is where the description will go.This is where the description will go.
          This is where the description will go.This is where the description will go.This is where the description will go.This is where the description will go.
          This is where the description will go.This is where the description will go.This is where the description will go.
        </p>
      </a>
      <a href='https://wiki.supercombo.gg/w/Street_Fighter_V' style={infoListStyle}> 
        <h4>Community Wiki</h4>
        <p>
        This is where the description will go.This is where the description will go.This is where the description will go.This is where the description will go.
        This is where the description will go.This is where the description will go.This is where the description will go.
        This is where the description will go.This is where the description will go.
        This is where the description will go.This is where the description will go.This is where the description will go.
        </p>
      </a>
      <a href='https://fullmeter.com/' style={infoListStyle}> 
      <h4>In-depth character frame data</h4>
        <p>
        This is where the description will go.
        This is where the description will go.
        This is where the description will go.
        </p>
      </a>
      </section>
    </div>
  );
}
