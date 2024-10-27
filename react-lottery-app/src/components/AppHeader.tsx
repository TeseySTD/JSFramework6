import AppNavigation from "./AppNavigation";

interface AppHeaderProps {
    title: string;
}

export default function AppHeader(props: AppHeaderProps) {
    return (
        <header>
            <AppNavigation/>
            <h1 className="text-center">{props.title}</h1>
        </header>
    );
}