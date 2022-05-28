import Footer from '../components/home/Footer';
import Hero from '../components/home/Hero';
import Pricing from '../components/home/Pricing';
import Support from '../components/home/Support'

function Home()  {
    return(
        <div>
            <Hero />
            <Support />
            <Pricing />
            <Footer />
        </div>
    );
}

export default Home ;