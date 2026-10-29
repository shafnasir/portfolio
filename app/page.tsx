import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Work } from "@/components/sections/Work";
import { Steps } from "@/components/ui/Steps";
import { getResumeHref } from "@/lib/resume";

export default function Home() {
  return (
    <>
      <Hero />
      <Steps from="paper" to="ink" />
      <Work />
      <Steps from="ink" to="paper" flip />
      <About />
      <Steps from="paper" to="ink" />
      <Experience />
      <Steps from="ink" to="signal" flip />
      <Contact resumeHref={getResumeHref()} />
    </>
  );
}
