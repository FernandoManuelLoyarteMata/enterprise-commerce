import { zodResolver } from "@hookform/resolvers/zod"
import { loginUser } from "app/actions/user.actions"
import { Button } from "components/Button"
import { DialogFooter } from "components/Dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "components/Form/Form"
import { GenericModal } from "components/GenericModal"
import { Input } from "components/Input"
import { Logo } from "components/Logo"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useModalStore } from "stores/modalStore"
import { z } from "zod"

const formSchema = z.object({
  email: z.string().email().min(3).max(64),
  password: z.string().min(3).max(64),
})

const formFields = [
  { label: "Email", name: "email", type: "text" },
  { label: "Password", name: "password", type: "password" },
] as const

export function LoginModal() {
  const modals = useModalStore((s) => s.modals)
  const closeModal = useModalStore((s) => s.closeModal)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(payload: z.infer<typeof formSchema>) {
    const { email, password } = payload
    const user = await loginUser({ email, password })

    if (user) {
      toast.success("Successfully logged in")

      closeModal("login")
      return
    }

    form.setError("root", { message: "Couldn't log in. The email address or password is incorrect." })
  }

  return (
    <GenericModal title="Login" open={!!modals["login"]} onOpenChange={() => closeModal("login")}>
      <Form {...form}>
        <Logo className="mt-6 flex size-24 w-full justify-center" />
        {form.formState.errors.root?.message && <p className="mt-6 w-full text-[14px] leading-tight tracking-tight text-red-400">{form.formState.errors.root?.message}</p>}
        <form name="loginForm" id="loginForm" onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
          {formFields.map((singleField) => (
            <FormField
              key={singleField.name}
              control={form.control}
              name={singleField.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{singleField.label}</FormLabel>
                  <FormControl>
                    <Input type={singleField.type} className="text-sm" placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs font-normal text-red-400" />
                </FormItem>
              )}
            />
          ))}
        </form>
      </Form>

      <DialogFooter>
        <Button
          size="lg"
          form="loginForm"
          className="hover:text-white"
          variant="secondary"
          isAnimated={false}
          type="submit"
          disabled={form.formState.isSubmitting}
          isLoading={form.formState.isSubmitting}
        >
          Submit
        </Button>
      </DialogFooter>
    </GenericModal>
  )
}
