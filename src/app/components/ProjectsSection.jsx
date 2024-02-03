/* @jsxRuntime classic */
/* @jsxImportSource react */
"use client";

import React, { useState, useEffect, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const [projectsData, setProjectsData] = useState([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    fetch("https://api.github.com/users/danielvor/repos")
      .then((response) => response.json())
      .then((data) =>
        data
          .filter((repo) => repo.name !== 'danielvor' && repo.name !== 'danielvor.github.io')
          .map((repo) => ({
            id: repo.id,
            title: repo.name,
            description: repo.description,
            image: ["/images/projects/1.png"], // Replace with actual image if available
            tag: ["All", "Web"], // Replace with actual tags if available
            gitUrl: repo.html_url,
            previewUrl: repo.homepage,
          }))
      )
      .then((projects) => setProjectsData(projects));
  }, []);
  
  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      {/* ... rest of your code ... */}
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl || '#'} // If gitUrl is null, use '#' as a fallback
              previewUrl={project.previewUrl || '#'} // If previewUrl is null, use '#' as a fallback
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
