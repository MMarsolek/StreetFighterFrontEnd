import React from 'react';
import { TwitterTimelineEmbed} from 'react-twitter-embed';
export default function Resources () {
  return (
    <div>
      <TwitterTimelineEmbed
        sourceType="https://twitter.com/StreetFighter?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
        screenName="StreetFighter"
        options={{width: 400}}
      />
    </div>
  );
}
