import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Business Owner'];
  const roles = ['Business Owner', 'Sustainability Manager', 'Waste Management Officer', 'Admin', 'Employee'];
  const applicationName = 'EcoTrack v4';
  const tenantName = 'Business Organization';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `Role: Business Owner

1. As a business owner, I want to be able to create an account for my organization on the environmental data management platform so that I can start monitoring our carbon footprint and waste management.

2. As a business owner, I want to be able to invite and assign roles to my team members (Sustainability Manager, Waste Management Officer, and Admin) so that they can access the platform and contribute to our organization's sustainability efforts.

3. As a business owner, I want to be able to view a dashboard with key metrics and insights about my organization's environmental performance so that I can make informed decisions about our sustainability strategy.

4. As a business owner, I want to be able to generate reports on our organization's environmental data so that I can share our progress with stakeholders and regulatory bodies.

Role: Sustainability Manager

1. As a sustainability manager, I want to be able to input and track data related to our organization's carbon emissions, energy consumption, and other environmental factors so that we can monitor our progress towards sustainability goals.

2. As a sustainability manager, I want to be able to access resources and best practices for implementing sustainable practices within our organization so that we can continuously improve our environmental performance.

3. As a sustainability manager, I want to be able to set targets and goals for our organization's environmental performance so that we can work towards reducing our carbon footprint and waste production.

Role: Waste Management Officer

1. As a waste management officer, I want to be able to input and track data related to our organization's waste production, recycling, and disposal so that we can monitor our progress towards waste reduction goals.

2. As a waste management officer, I want to be able to access resources and best practices for managing waste within our organization so that we can continuously improve our waste management processes.

3. As a waste management officer, I want to be able to collaborate with the sustainability manager to develop strategies for reducing waste and improving our organization's overall environmental performance.

Role: Admin

1. As an admin, I want to be able to manage user accounts and permissions within our organization's environmental data management platform so that the right team members have access to the tools and information they need.

2. As an admin, I want to be able to configure the platform to meet our organization's specific needs and preferences, such as customizing the dashboard and setting up integrations with other software tools.

3. As an admin, I want to be able to ensure the security and privacy of our organization's environmental data by managing access controls and monitoring user activity on the platform.

Role: Employee (not a member of the Business Organization)

1. As an employee, I want to be able to access educational resources and information about my employer's sustainability efforts so that I can better understand the environmental impact of our organization and how I can contribute to reducing it.

2. As an employee, I want to be able to participate in company-wide sustainability initiatives, such as recycling programs or energy-saving challenges, so that I can help my organization achieve its environmental goals.

3. As an employee, I want to be able to provide feedback and suggestions for improving our organization's environmental performance so that we can continuously work towards becoming a more sustainable business.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="20px" bottom="20px" zIndex={3}>
      <Popover placement="top">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody maxH="400px" overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application. Feel free to remove this tutorial with the{' '}
              <Box as="span" bg="yellow.300" p={1}>
                NEXT_PUBLIC_SHOW_BRIEFING
              </Box>{' '}
              environment variable.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
