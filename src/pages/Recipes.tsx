"use client";
import { useState } from "react";
import {
  AppLayout,
  BreadcrumbGroup,
  Container,
  ContentLayout,
  Flashbar,
  Header,
  HelpPanel,
  Link,
  SideNavigation,
  Slider,
  SplitPanel,
} from "@cloudscape-design/components";

const Recipes = () => {
  const [value, setValue] = useState(1);
  const data = [1, 2, 3, 4, 5, 6];
  return (
    <AppLayout
      navigationOpen={true}
      navigation={<Container>

      <Slider
        onChange={({ detail }) => setValue(detail.value)}
        value={value}
        max={6}
        min={1}
        />
        </Container>
      }
      toolsOpen={true}
      tools={<HelpPanel header={<h2>Overview</h2>}>Help content</HelpPanel>}
      content={
        <ContentLayout
          header={
            <Header variant="h1" info={<Link variant="info">Info</Link>}>
              Page header
            </Header>
          }
        >
          <Container
            header={
              <Header variant="h2" description="Container description">
                Container header
              </Header>
            }
          >
            <div className="contentPlaceholder" />
          </Container>
        </ContentLayout>
      }
      splitPanel={
        <SplitPanel header="Split panel header">Split panel content</SplitPanel>
      }
    />
  );
};

export default Recipes;
