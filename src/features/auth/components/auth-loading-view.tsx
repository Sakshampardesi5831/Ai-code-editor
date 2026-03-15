import { Fragment } from "react";
import { Spinner } from "@/components/ui/spinner";
const AuthLoadingView = () => {
  return (
    <Fragment>
      <div className="flex items-center justify-center h-screen bg-background">
        <Spinner className="size-6 text-ring" />
      </div>
    </Fragment>
  );
};

export default AuthLoadingView;
