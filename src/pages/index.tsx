import { type NextPage } from "next";
import { useSession } from "next-auth/react";

import Container from "~/components/Container";
import Login from "~/components/Login";
import ProfileDropdown from "~/components/ProfileDropdown";
import TodoForm from "~/components/TodoForm";
import { trpc } from "~/utils/trpc";

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
                {todo.description}
              </div>
            ))}
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
