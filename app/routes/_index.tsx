import { json, type MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const res = await fetch("http://localhost:4000/users", {
    credentials: "include",
  });

  const r = await res.json<{
    users: {
      id: number;
      name: string;
    }[];
  }>();
  return json(r);
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      {data.users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
