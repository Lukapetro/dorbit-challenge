import { Link, useMatch, useResolvedPath } from "react-router-dom";
import classNames from "classnames";

export default function CustomLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      className={classNames(
        match
          ? "bg-gray-900 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white",
        "px-3 py-2 rounded-md text-sm font-medium"
      )}
      to={to}
      {...props}
    >
      {children}
    </Link>
  );
}
