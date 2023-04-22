import { logo } from '../assets'

const Hero = () => {
  return (
    <header className="w-full flex flex-col justify-center items-center">
        <nav className="flex w-full pt-3 mb-10 justify-between items-center">
            <img src={logo} alt="sumz_logo" className="w-28 object-contain" />
            <button
                type="button"
                onClick={() => window.open("https://github.com/guhandelta")}
                className="black_btn"
            >
                GitHub
            </button>
        </nav>

        <h1 className="head_text">
            Summarize Articles with <br className="max-md:hidden" />
            {/*max-md:hidden => break the test into multiple lines only on smaller devices*/}
            <span className="orange_gradient">
                OpenAI GPT-4
            </span>
        </h1>

        <h2 className="desc">
            Simplify your reading with Surukkam, an open-source article summarizer that condenses lengthy articles into clear and concise summaries.
        </h2>
    </header>
  )
}

export default Hero
