import { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { loginRequest, loginSuccess, loginFailure } from "@/redux/slices/authSlice";

const loginSchema = z.object({
  userName: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const API_BASE = import.meta.env.VITE_API_URL;
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("rememberMe") === "true"
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    setFocus("userName");
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate, setFocus]);

  const handleForm = async (formData) => {
    dispatch(loginRequest());

    try {
      const response = await fetch(`${API_BASE}/api/dg/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("content-type");
      const data = contentType?.includes("application/json")
        ? await response.json()
        : {};

      if (response.ok) {
        dispatch(loginSuccess(data.user || {}));
        console.log("Login successful:", data);
        
        toast.success("Login successful!");

        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("rememberMe");
        }

        navigate("/");
      } else {
        dispatch(loginFailure(data.message || "Login failed"));
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      toast.error(`Network error: ${error.message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleForm)}
      className="min-h-screen flex justify-center items-center bg-gray-100"
    >
      <Card className="w-full max-w-md p-6 shadow-xl rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Login to your account</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="userName">Username</Label>
            <Input
              id="userName"
              type="text"
              placeholder="Enter your username"
              {...register("userName")}
            />
            {errors.userName && (
              <p className="text-sm text-red-600">{errors.userName.message}</p>
            )}
          </div>

          {/* Password */}
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

          {/* Remember Me */}
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(!!checked)}
            />
            <label htmlFor="remember" className="text-sm">
              Remember me
            </label>
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
