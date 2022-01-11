import { Card, StyledBody, StyledAction } from "baseui/card";
import { Button } from "baseui/button";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

interface HomeProps {
  users: User[];
}

interface User {
  id: string;
  name: string;
}

const Home = ({ users }: HomeProps) => {
  const router = useRouter();
  const merchant = router.query.merchant;

  return (
    <>
      {users.map((user) => {
        return (
          <Card key={user.id}>
            <StyledBody>{user.name}</StyledBody>
            <StyledAction>
              <Button
                overrides={{
                  BaseButton: { style: { width: "100%" } },
                }}
              >
                Button Label
              </Button>
            </StyledAction>
          </Card>
        );
      })}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const users = await res.json();
  console.log(users);
  return {
    props: {
      users,
    },
  };
};

export default Home;
