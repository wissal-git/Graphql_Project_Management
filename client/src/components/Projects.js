import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import ProjectCard from "./ProjectCard";

import Spinner from "./Spinner";



export default function Projects(){
    const {loading,error,data} = useQuery (GET_PROJECTS);
    
    if (loading) return <Spinner></Spinner>;
    if (error) return <p>Something went wrong</p>;
    
    return <>
        {data.projects.length >0 ? (
            <div className="row mt-5">
                {data.projects.map((project) =>(
                    <ProjectCard key={project.id} project ={project}></ProjectCard>
                ))}

            </div>
        
        ):(<p>No Projects</p>)}
        </>;
    }

