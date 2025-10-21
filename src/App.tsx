import "./App.css";
import { Field, Input, Label } from "@headlessui/react";

function App() {
  return (
    <div className="h-svh flex flex-col gap-8 justify-center items-center">
      <Field className="flex flex-col">
        <Label>Username</Label>
        <Input
          className="border border-amber-600"
          name="username"
          type="text"
        />
      </Field>
      <Field className="flex flex-col">
        <Label>Password</Label>
        <Input
          className="border border-amber-600"
          name="password"
          type="password"
        />
      </Field>
    </div>
  );
}

export default App;
