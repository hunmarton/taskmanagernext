"use client"; // This marks the component as a Client Component

import Header from "@/app/(app)/Header";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      console.log("Fetching projects...");

      try {
        const response = await axios.get("/api/projects");
        console.log("Response:", response);
        setProjects(response.data); // Assuming response data is an array of projects
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err.response ? err.response.data : err.message); // Handle error response better
      } finally {
        setLoading(false); // Stop loading once the data is fetched or an error occurs
      }
    };

    fetchProjects();
  }, []); // Empty dependency array, fetch data once when component mounts

  useEffect(() => {
    // This will run whenever `projects` or `error` state changes
    console.log(projects, "Projects state");
    console.log(error, "Error state");
  }, [projects, error]);
  return (
    <>
      <Header title="Projects" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              Here are your projects!{" "}
              {projects.length ? (
                <ul>
                  {projects.map((project) => (
                    <li key={project.id}>{project.name}</li>
                  ))}
                </ul>
              ) : (
                <p>No project!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
