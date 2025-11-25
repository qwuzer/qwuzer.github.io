import { ExternalLink, Github } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";

export const projectsData = [
  // {
  //   title: "E-Commerce Platform",
  //   description:
  //     "Full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include product management, cart functionality, and secure checkout.",
  //   tech: ["React", "Node.js", "MongoDB", "Stripe"],
  //   image: "bg-gradient-to-br from-blue-500 to-purple-500",
  //   githubUrl: "https://github.com/yourusername/ecommerce-platform",
  //   demoUrl: "https://ecommerce-demo.example.com",
  // },
  {
    title: "OOAD: Study Helper",
    description:
      "Object-Oriented Analysis and Design project that helps students study by providing a platform for them to upload their study materials and create notes. \n I have implemented the note creation/editing/deletion functionality, as well as the ability to upload study materials and sort notes.",
    tech: ["Typescript", "React", "AdonisJS", "PostgreSQL"],
    image: "bg-gradient-to-br from-orange-500 to-pink-500",
    githubUrl: "https://github.com/tanerijun/ntnu-ooad-final-project",
    demoUrl: "https://ntnu-ooad-final-project.vercel.app/",
  },
  {
    title: "PokeStats: Visualization Dashboard",
    description:
      "Data visualization dashboard with interactive charts, real-time metrics, and customizable features.",
    tech: ["JavaScript", "TypeScript", "D3.js", "TailwindCSS"],
    image: "bg-gradient-to-br from-green-500 to-teal-500",
    githubUrl:
      "https://github.com/qwuzer/Data-visualization-PokeStats-Explorer",
    demoUrl: "https://pokestats-demo.example.com",
  },
];

interface ProjectsWindowProps {
  highlightedProject?: string | null;
}

export const ProjectsWindow = ({ highlightedProject }: ProjectsWindowProps) => {
  const projectRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (highlightedProject && projectRefs.current[highlightedProject]) {
      projectRefs.current[highlightedProject]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [highlightedProject]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>

      <div className="grid gap-6">
        {projectsData.map((project, index) => {
          const isHighlighted = highlightedProject === project.title;
          return (
            <div
              key={index}
              ref={(el) => {
                projectRefs.current[project.title] = el;
              }}
              className={`flex gap-6 p-6 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors group ${
                isHighlighted ? "ring-2 ring-primary shadow-lg" : ""
              }`}
            >
              <div
                className={`w-48 h-32 rounded-lg ${project.image} flex-shrink-0`}
              />

              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2" asChild>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" className="gap-2" asChild>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
