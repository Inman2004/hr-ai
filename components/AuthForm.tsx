/* eslint-disable react/react-in-jsx-scope */
"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type : FormType }) => {
    const formSchema = authFormSchema(type)
    
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        email: "",
        password: "",
      },
    })
   const router = useRouter()
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
      try {
        if (type === "sign-up") {
          toast.success("Account created successfully")
          router.push("/sign-in")
          } else {
            toast.success("Logged in successfully")
            router.push("/")
          }
        }
      catch (error) {
        console.log(error);
        toast.error(`There was an error: ${error}`);
      }
    }

    const isSignIn = type === 'sign-in';

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/favicon.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">AI Assistant</h2>
        </div>
      <h3 className="text-center">Pratice Interviews With AI</h3>
      
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
        {!isSignIn && <FormField control={form.control} name="name" label="User Name" placeholder="Your Name" type="text" />}
        <FormField control={form.control} name="email" label="E-Mail" placeholder="Your e-mail" type="email" />
        <FormField control={form.control} name="password" label="Password" placeholder="Your password" type="password" />
        <Button className="btn" type="submit">{isSignIn ? 'Sign In' : 'Create An Account'}</Button>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        {isSignIn ? "Don't have an account?" : 'Already have an account?'}
        <Link href={isSignIn ? '/sign-up' : '/sign-in'} className="font-bold text-primary-100 ml-1" >
          {isSignIn ? 'Create an account' : 'Sign In'}
        </Link>
        </p>
    </Form>
    </div>
    </div>
  )
}

export default AuthForm
