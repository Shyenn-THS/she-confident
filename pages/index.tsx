import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Stats from '../components/Stats';
import About from '../components/About';

type Props = {};

const Home = (props: Props) => {
  return (
    <main>
      <Carousel
        autoPlay={true}
        stopOnHover={true}
        infiniteLoop={true}
        swipeable={true}
        showStatus={false}
        showThumbs={false}
        useKeyboardArrows={true}
        interval={5000}
      >
        <div>
          <img src="/carousel/1.png" />
          <p className="legend">Empower Women Projects</p>
        </div>

        <div>
          <img src="/carousel/2.png" />
          <p className="legend">Build your confidence on Camera</p>
        </div>

        <div>
          <img src="/carousel/3.png" />
          <p className="legend">Legend 3</p>
        </div>
      </Carousel>
      <Stats />
      <About />
    </main>
  );
};

export default Home;
