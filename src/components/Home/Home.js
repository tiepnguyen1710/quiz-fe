import videoHomePage from "../../assets/hero.webm"
const Home = () => {
    return (
        <div className="home-page">
            <video autoPlay muted loop className="inner-video">
                <source src={videoHomePage} type="video/mp4"></source>
            </video>
            <div className="text-content">
                <div className='title-1'>
                    Make forms
                    worth filling out
                </div>
                <div className='title-2'>
                    Get more data—like signups, feedback, 
                    and anything else—with forms designed to be refreshingly different.
                </div>
                <div className='title-3'>
                    <button className="btnStart">Get started. It's free</button>
                </div>
            </div>
        </div>
    )
}

export default Home;