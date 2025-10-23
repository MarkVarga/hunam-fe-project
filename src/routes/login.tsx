import { Field, Label, Input, Button } from "@headlessui/react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useLogin } from "../services/hooks/useLogin";
import { useState } from "react";
import { useAuth } from "../contexts/hooks/useAuth";

export const Route = createFileRoute("/login")({
  component: Login,
  beforeLoad: ({ context }) => {
    console.log(context.auth.user);
    if (context.auth.user) {
      throw redirect({
        to: "/",
      });
    }
  },
});

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { mutate, isPending, error } = useLogin();
  const { login } = useAuth();

  const handleSubmit = () => {
    mutate(
      {
        username: username,
        password: password,
      },
      {
        onSuccess: (data) => {
          console.log("logged in ", data);
          login(data);
        },
      },
    );
  };

  return (
    <div className="border border-b-neutral-700 p-16 flex gap-8 flex-col">
      <Field className="flex flex-col">
        <Label>Username</Label>
        <Input
          className="border  border-b-neutral-700"
          name="username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
      </Field>
      <Field className="flex flex-col">
        <Label>Password</Label>
        <Input
          className="border  border-b-neutral-700"
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Field>
      <div>
        <Button onClick={handleSubmit}>Login</Button>
      </div>
      {error && <p>Error logging in</p>}
    </div>
  );
}
