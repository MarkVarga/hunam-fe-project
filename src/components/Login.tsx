import { Field, Label, Input, Button } from "@headlessui/react";

const Login = () => {
  return (
    <div className="border border-b-neutral-700 p-16 flex gap-8 flex-col">
      <Field className="flex flex-col">
        <Label>Username</Label>
        <Input
          className="border  border-b-neutral-700"
          name="username"
          type="text"
        />
      </Field>
      <Field className="flex flex-col">
        <Label>Password</Label>
        <Input
          className="border  border-b-neutral-700"
          name="password"
          type="password"
        />
      </Field>
      <div>
        <Button>Login</Button>
      </div>
    </div>
  );
};

export default Login;
