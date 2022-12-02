import { type NextPage } from "next";
import { useSession } from "next-auth/react";

import Container from "~/components/Container";
import Login from "~/components/Login";
import ProfileDropdown from "~/components/ProfileDropdown";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Container>
        {sessionData ? (
          <div>
            <h1 className="text-3xl font-semibold">
              {sessionData?.user?.name}&apos;s todo list
            </h1>
            <ProfileDropdown />
          </div>
        ) : (
          <Login />
        )}
      </Container>
    </>
  );
};

export default Home;
