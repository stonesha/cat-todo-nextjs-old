import { type NextApiRequest, type NextApiResponse, type NextPage } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";

import Container from "~/components/Container";
import ProfileDropdown from "~/components/ProfileDropdown";
import TodoForm from "~/components/TodoForm";
import { todoRouter } from "~/server/trpc/router/todo";
import { trpc } from "~/utils/trpc";
import { authOptions } from "./api/auth/[...nextauth]";
import { prisma } from "~/server/db/client";
import TodoItem from "~/components/TodoItem";
import TodoEditModal from "~/components/TodoEditModal";

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

  const ssg = createProxySSGHelpers({
    router: todoRouter,
    ctx: {
      session: sessionData,
      prisma: prisma,
    },
    transformer: superjson,
  });

  await ssg.all;

  return { props: { trpcState: ssg.dehydrate() } };
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
            <h1 className="mb-2 w-full overflow-hidden text-ellipsis text-center text-3xl font-semibold">
              {sessionData?.user?.name}&apos;s todo list
            </h1>
            <TodoForm />
            {allTodos.data?.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
            <ProfileDropdown />
            <TodoEditModal />
          </div>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};

export default Home;
