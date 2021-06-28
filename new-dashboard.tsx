import React from "react";
import styled from "styled-components";
import {
  Box,
  H2,
  H5,
  H4,
  Text,
  Illustration,
  IllustrationProps,
  Button,
} from "@adminjs/design-system";

import { useTranslation } from "adminjs/src/frontend/hooks";

import { useHistory, useLocation } from "react-router";

const pageHeaderHeight = 284;
const pageHeaderPaddingY = 74;
const pageHeaderPaddingX = 250;

export const DashboardHeader: React.FC = () => {
  const { translateMessage } = useTranslation();
  return (
    <Box position="relative" overflow="hidden">
      <Box
        position="absolute"
        top={50}
        left={-10}
        opacity={[0.2, 0.4, 1]}
        animate
      >
        <Illustration variant="Rocket" />
      </Box>
      <Box
        position="absolute"
        top={20}
        right={10}
        opacity={[0.2, 0.4, 1]}
        animate
      >
        <Illustration variant="Astronaut" />
      </Box>
      <Box
        bg="grey100"
        height={pageHeaderHeight}
        py={pageHeaderPaddingY}
        px={["default", "lg", pageHeaderPaddingX]}
      >
        <Text textAlign="center" color="white">
          <H2>Hello there!</H2>
          <Text opacity={0.8}>
            You can modify the tables from your database by going to the sidebar
            - sebin
          </Text>
        </Text>
      </Box>
    </Box>
  );
};

type BoxType = {
  variant: string;
  title: string;
  subtitle: string;
  href: string;
};

const boxes = ({ translateMessage }): Array<BoxType> => [
  {
    variant: "Planet",
    title: translateMessage("Add to the People table"),
    subtitle: translateMessage("- Sebin"),
    href: "/admin/resources/People",
  },
  {
    variant: "Astronaut",
    title: translateMessage("Logout"),
    subtitle: translateMessage("Sign out of this admin session"),
    href: "/admin/logout",
  },
];

const Card = styled(Box)`
  display: ${({ flex }): string => (flex ? "flex" : "block")};
  color: ${({ theme }): string => theme.colors.grey100};
  text-decoration: none;
  border: 1px solid transparent;
  &:hover {
    border: 1px solid ${({ theme }): string => theme.colors.primary100};
    box-shadow: ${({ theme }): string => theme.shadows.cardHover};
  }
`;

Card.defaultProps = {
  variant: "white",
  boxShadow: "card",
};

export const Dashboard: React.FC = () => {
  const { translateMessage, translateButton } = useTranslation();
  const history = useHistory();
  return (
    <Box>
      <DashboardHeader />
      <Box
        mt={["xl", "xl", "-100px"]}
        mb="xl"
        mx={[0, 0, 0, "auto"]}
        px={["default", "lg", "xxl", "0"]}
        position="relative"
        flex
        flexDirection="row"
        flexWrap="wrap"
        width={[1, 1, 1, 1024]}
      >
        {boxes({ translateMessage }).map((box, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Box key={index} width={[1, 1 / 2, 1 / 2, 1 / 3]} p="lg">
            <Card
              as="a"
              href="/admin/resources/People"
              onClick={(event, element): void => {
                event.preventDefault();
                if (element?.href) {
                  history.push(element.href);
                } else {
                  history.push(box.href);
                }
              }}
            >
              <Text textAlign="center">
                <Illustration
                  variant={box.variant as IllustrationProps["variant"]}
                  width={100}
                  height={70}
                />
                <H5 mt="lg">{box.title}</H5>
                <Text>{box.subtitle}</Text>
              </Text>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
