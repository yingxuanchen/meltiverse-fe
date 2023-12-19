import MaterialList from "./MaterialList";
import { Box, Drawer, Tab, Tabs } from "@mui/material";
import TagList from "./TagList";
import { SyntheticEvent, useContext, useState } from "react";
import { contentStore } from "../../store/contentStore";
import { sidebarStore } from "../../store/sidebarStore";

const Sidebar = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const { state: sidebarState, dispatch: sidebarDispatch } =
    useContext(sidebarStore);
  const { state: contentState } = useContext(contentStore);

  const handleChangeTab = (event: SyntheticEvent, tabIndex: number) => {
    setTabIndex(tabIndex);
  };

  const handleCloseDrawer = () => {
    if (contentState.contentType !== null) {
      sidebarDispatch({
        type: "CLOSE",
      });
    }
  };

  return (
    <Drawer
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: 700 },
      }}
      open={sidebarState.open}
      onClose={handleCloseDrawer}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs centered onChange={handleChangeTab} value={tabIndex}>
          <Tab label="Materials" />
          <Tab label="Tags" />
        </Tabs>
      </Box>
      {tabIndex === 0 ? <MaterialList /> : <TagList />}
    </Drawer>
  );
};

export default Sidebar;
