"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import { cn } from "@/lib/utils";
import useLogin from "./hook/useLogin";

function LoginPage() {
  const { form, onSubmit } = useLogin();

  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <div className="w-full md:max-w-[50vw] xl:max-w-[30vw] max-xl:max-w-[500px] border border-input rounded-md p-3">
        <div className="flex justify-center mb-5 pb-3">
          <span className="text-primary font-bold text-xl">Login</span>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 flex flex-col pb-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className={cn({
                        "border-destructive": form.formState.errors.email,
                      })}
                      placeholder="example@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <InputPassword
                      className={cn({
                        "border-destructive": form.formState.errors.password,
                      })}
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={form.formState.isSubmitting} type="submit" className="!mt-4">
              {form.formState.isSubmitting ? "Loading" : "Login"}
            </Button>
          </form>
        </Form>
        <div className="flex justify-center pt-3">
          <span className="text-primary font-bold text-xl">CMS Portfolio</span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
