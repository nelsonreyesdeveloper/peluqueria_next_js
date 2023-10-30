"use client"
import SectionTitle from "@/components/landing/sectionTitle";
import { benefitOne, benefitTwo } from "@/components/landing/data";
import Video from "@/components/landing/video";
import Benefits from "@/components/landing/benefits";
import Footer from "@/components/landing/footer";
import Testimonials from "@/components/landing/testimonials";
import Cta from "@/components/landing/cta";
import Faq from "@/components/landing/faq";
import PopupWidget from "@/components/landing/popupWidget";
import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/navigation";

const Home = () => {
 const router = useRouter();
 router.push("/login");
  return (

    <div className="xl:w-[95%] xl:mx-auto">

      <ThemeProvider attribute="class">

        <ThemeProvider>
          <Navbar />
          <Hero />
          <SectionTitle
            pretitle="Nextly Benefits"
            title=" Why should you use this landing page">
            Nextly is a free landing page & marketing website template for startups
            and indie projects. Its built with Next.js & TailwindCSS. And its
            completely open-source.
          </SectionTitle>
          <Benefits data={benefitOne} />
          <Benefits imgPos="right" data={benefitTwo} />
          <SectionTitle
            pretitle="Watch a video"
            title="Learn how to fullfil your needs">
            This section is to highlight a promo or demo video of your product.
            Analysts says a landing page with video has 3% more conversion rate. So,
            don&apos;t forget to add one. Just like this.
          </SectionTitle>
          <Video />
          <SectionTitle
            pretitle="Testimonials"
            title="Here's what our customers said">
            Testimonails is a great way to increase the brand trust and awareness.
            Use this section to highlight your popular customers.
          </SectionTitle>
          <Testimonials />
          <SectionTitle pretitle="FAQ" title="Frequently Asked Questions">
            Answer your customers possible questions here, it will increase the
            conversion rate as well as support or chat requests.
          </SectionTitle>
          <Faq />
          <Cta />
          <Footer />
          <PopupWidget />

        </ThemeProvider>
      </ThemeProvider>
    </div>





  );
}

export default Home;