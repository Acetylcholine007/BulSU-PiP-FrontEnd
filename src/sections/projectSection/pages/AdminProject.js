import { Container, Grid } from "@material-ui/core";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

import { ProjectContext } from "../../../contexts/ProjectContext";
import AdminProjectFilter from "../components/AdminProjectFilter";
import AdminProjectList from "../components/AdminProjectList";

function AdminProject() {
  const {projects} = useContext(ProjectContext);
  const [filter, setFilter] = useState({search: ''});
  const [filteredProject, setFilteredProject] = useState(projects);
  useEffect(() => {
    setFilteredProject(filter.search === '' ? projects : projects.filter((project) => project.title.toLowerCase().includes(filter.search.toLowerCase())))
  }, [filter])

  return (
    <Container>
      <Grid container>
        <Grid item xs = {9}>
          <AdminProjectList projects = {filteredProject}/>
        </Grid>
        <Grid item xs = {3}>
          <AdminProjectFilter filter = {filter} setFilter = {setFilter}/>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AdminProject;
