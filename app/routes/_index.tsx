import { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({
    params,
    request
}: LoaderFunctionArgs) => {

    return null;
}

export default function Index() {
    return (
        <div>
            
        </div>
    );
}