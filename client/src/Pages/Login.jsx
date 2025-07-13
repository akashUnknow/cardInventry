import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define Zod schema
const loginSchema = z.object({
  userName: z.string().min(1, "userName is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

const handleForm = async (formData) => {
  console.log(formData)
  try {
    const response = await fetch("http://localhost:8080/api/dg/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    let data;

    // ✅ Only try to parse JSON if there's content
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = {};
    }

    if (response.ok) {
      toast.success("Login successful!");
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      navigate("/");
    } else {
      toast.error(data.message || "Login failed.");
    }
  } catch (error) {
    console.error("Login error:", error);
    toast.error(`Network or server error: ${error.message}`);
  }
};


  return (
    <form
      onSubmit={handleSubmit(handleForm)}
      className="min-h-screen flex justify-center bg-gray-100 px-2 pt-20"
    >
      <Card className="w-full max-w-md p-6 shadow-xl rounded-2xl min-h-1/3 h-3/4">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Login to your account</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="Username">Username</Label>
            <Input
              id="userName"
              type="text"
              placeholder="userName"
              {...register("userName")}
            />
            {errors.userName && (
              <p className="text-sm text-red-600">{errors.userName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-800"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked)}
              />
              <label htmlFor="remember" className="text-sm">
                Remember me
              </label>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500">
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Login;
