// import Head from 'next/head'
// import styles from '../styles/Home.module.css'

export default function Home() {
  return (
  <div className="w-100 py-12">
    <div className="text-center">
      <h3 className="mt-2 text-6xl font-semibold">TechHacks</h3>
      <h6 className="mt-4 text-xl font-semibold lg:max-auto">As representatives of the nation's largest and most prestigious STEM high school, TechHacks aims to expand student engagement in technology through hackathons, workshops, and computer science events.</h6>

      <h3 className="mt-16 text-3xl font-bold">Sponsors</h3>
      <div className="flex flex-wrap items-center justify-center -mx-4 px-24 overflow-hidden">
        <div className="my-4 px-8 w-2/3 min-w-full sm:w-1/2 md:w-1/4 sm:min-w-0 overflow-hidden">
          <img className="w-auto" src="images/sponsor-logos/echoAR-dark.png" alt="echoAR"/>
        </div>
        <div className="my-4 px-8 w-2/3 min-w-full sm:w-1/2 md:w-1/4 sm:min-w-0 overflow-hidden">
          <img src="images/sponsor-logos/sashido.png" alt="Sashido"/>
        </div>
        <div className="my-4 px-8 w-2/3 min-w-full sm:w-1/2 md:w-1/4 sm:min-w-0 overflow-hidden">
          <img src="images/sponsor-logos/wolfram.png" alt="Wolfram"/>
        </div>
        <div className="my-4 px-8 w-2/3 min-w-full sm:w-1/2 md:w-1/4 sm:min-w-0 overflow-hidden">
          <img src="images/sponsor-logos/Magoosh.png" alt="Magoosh"/>
        </div>
        <div className="my-4 px-8 w-2/3 min-w-full sm:w-1/2 md:w-1/4 sm:min-w-0 overflow-hidden">
          <img src="images/sponsor-logos/linode.png" alt="Linode"/>
        </div>
        <div className="my-4 px-8 w-2/3 min-w-full sm:w-1/2 md:w-1/4 sm:min-w-0 overflow-hidden">
          <img src="images/sponsor-logos/balsamiq.png" alt="Balsamiq"/>
        </div>
      </div>

    </div>
  </div>) 

}
