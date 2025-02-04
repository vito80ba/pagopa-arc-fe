import { Tabs as MuiTabs, Tab } from '@mui/material';
import React, { ReactElement } from 'react';
import useTabs from './useTabs';
import TabPanel from './TabPanel';

interface TabProps {
  title: string;
  content: ReactElement;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabProps[];
  hideTabs?: boolean;
  /** the zero based index of the initial active Tab */
  initialActiveTab?: number;
}

export const Tabs = (props: TabsProps) => {
  const { activeTab, changeActiveTab } = useTabs(props.initialActiveTab);
  const { tabs, hideTabs = false } = props;
  return tabs.length > 0 ? (
    <>
      <MuiTabs
        sx={{ display: hideTabs ? 'none' : 'unset' }}
        value={activeTab}
        variant="fullWidth"
        onChange={(_, value: number) => changeActiveTab(value)}>
        {tabs.map(({ title, disabled }, index) => (
          <Tab label={title} disabled={disabled} key={`${title}-${index}`} />
        ))}
      </MuiTabs>
      {tabs.map((tab, index) => (
        <TabPanel value={index} activeValue={activeTab} key={index}>
          {tab.content}
        </TabPanel>
      ))}
    </>
  ) : null;
};

export default Tabs;
