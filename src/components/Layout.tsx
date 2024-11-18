// Layout.tsx
import React, { useEffect, useState } from 'react';
//import '@cloudscape-design/global-styles/index.css';
import { TopNavigation } from '@cloudscape-design/components';
import { Outlet } from 'react-router-dom';
import { signOut } from "aws-amplify/auth";
import { getCurrentUser } from "aws-amplify/auth";

/*interface LayoutProps {
  children: React.ReactNode;
}*/

/*const Layout: React.FC<LayoutProps> = ({ children }) => {*/
const Layout: React.FC = () => {
  const [theUser, setTheUser] = useState<string>();

  useEffect(() => {
    const loadUsername = async () => {
      try {
        const user = await getCurrentUser();
        setTheUser(user.signInDetails?.loginId);
      } catch (error) {
        console.error('Error loading username:', error);
      }
    };
    loadUsername();
  }, []);
  return (
    <div className="app-container">
      {/* Top navigation bar */}
      <TopNavigation
        identity={{
          title: "MyApp",
          href: "/",
          logo: { src: "/logo.png", alt: "MyApp Logo" }, // Your logo here
        }}
        utilities={[
          {
            type: 'button',
            text: 'Sign Out',
            onClick: () => signOut(),
          },
          {
            type: 'button',
            text: 'Household',
            href: '/household',
          },
          {
            type: 'button',
            text: 'Ingredients',
            href: '/ingredients',
          },
          {
            type: 'button',
            text: 'Dishes',
            href: '/dishes',
          },
          {
            type: 'button',
            text: 'Shopping List',
            href: '/shoppinglist',
          },
          {
            type: 'button',
            text: 'Stock',
            href: '/stock',
          },
          {
            type: 'button',
            text: 'Supermarkets',
            href: '/supermarkets',
          },
          {
            type: 'button',
            text: 'Discounts',
            href: '/discounts',
          },
          {
            type: 'button',
            text: `${theUser}`,
            href: '#',
            iconName: "user-profile",
            variant: 'primary-button', // Changed from 'normal' to 'link'
          }
        ]}
        i18nStrings={{
          searchIconAriaLabel: "Open search",
          searchDismissIconAriaLabel: "Close search",
          overflowMenuTriggerText: "More",
          overflowMenuDismissIconAriaLabel: "Close menu",
        }}
      />

      {/* If you don't want to use the Outlet, you can use the following code
      <div className="content">
        {children}
      </div>
      */}
      <main className="content">
        <Outlet />  {/* Outlet will render the child routes here */}
      </main>      

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 MyApp. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
