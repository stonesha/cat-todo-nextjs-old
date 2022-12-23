import { type NextApiRequest, type NextApiResponse, type NextPage } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";

import Container from "~/components/Container";
import ProfileDropdown from "~/components/ProfileDropdown";
import TodoForm from "~/components/TodoForm";
import { trpc } from "~/utils/trpc";
import { authOptions } from "./api/auth/[...nextauth]";

export async function getServerSideProps({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const sessionData = await unstable_getServerSession(req, res, authOptions);

  if (!sessionData) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: {} };
}

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const allTodos = trpc.todo.all.useQuery(undefined, {
    staleTime: 3000,
  });

  return (
    <>
      <Container>
        {sessionData ? (
          <div>
            <h1 className="text-3xl font-semibold">
              {sessionData?.user?.name}&apos;s todo list
            </h1>
            <br />
            <TodoForm />
            {allTodos.data?.map((todo) => (
              <div key={todo.id}>
                <p>{todo.title}</p>
              </div>
            ))}
            <ProfileDropdown />
          </div>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};

export default Home;
