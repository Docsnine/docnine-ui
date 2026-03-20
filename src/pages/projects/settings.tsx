import { useEffect, useState } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import { useProjectStore } from "@/store/projects"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { SlackIntegrationSettings } from "@/components/integrations/SlackIntegrationSettings"
import { ProjectGeneralSettings } from "@/components/project/ProjectGeneralSettings"
import { AlertTriangle, ArrowLeft, BookOpen, Settings, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

export function ProjectSettingsPage() {
    const { id } = useParams<{ id: string }>()
    const [searchParams] = useSearchParams()
    const { getProject } = useProjectStore()

    const [project, setProject] = useState<ReturnType<typeof useProjectStore.getState>["projects"][0] | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState("general")

    const isOwner = !project || project.shareRole === "owner"
    const slackStatus = searchParams.get("slack")
    const slackMessage = searchParams.get("message")
    const slackWorkspace = searchParams.get("workspace")

    // If slack integration tab is needed from URL, switch to it
    useEffect(() => {
        if (slackStatus) {
            setActiveTab("integrations")
        }
    }, [slackStatus])

    const handleProjectUpdate = (updatedProject) => {
        setProject(updatedProject)
    }

    useEffect(() => {
        if (!id) return
        setIsLoading(true)
        setError(null)
        getProject(id)
            .then((p) => setProject(p))
            .catch((err: any) => setError(err?.message ?? "Failed to load project."))
            .finally(() => setIsLoading(false))
    }, [id, getProject])

    if (isLoading) {
        return (
            <div className="space-y-6 mt-4">
                <Skeleton className="h-6 w-52" />
                <div className="bg-card p-6 rounded-xl border border-border">
                    <Skeleton className="h-8 w-64 mb-3" />
                    <Skeleton className="h-4 w-80" />
                </div>
                <Skeleton className="h-80 w-full" />
            </div>
        )
    }

    if (error || !project) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
                <h2 className="text-2xl font-bold">Project Not Found</h2>
                <p className="text-muted-foreground mt-2">{error ?? "The project does not exist or has been deleted."}</p>
                <Button asChild className="mt-6">
                    <Link to="/dashboard">Back to Dashboard</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="flex justify-center">

            <div className={cn("w-full space-y-6", "max-w-3xl")}>
                <div className="space-y-6 mt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground capitalize">
                        <Link to="/dashboard" className="hover:text-foreground flex items-center gap-1 transition-colors">
                            <ArrowLeft className="h-4 w-4" /> Dashboard
                        </Link>
                        <span>/</span>
                        <Link to={`/projects/${project.id}`} className="hover:text-foreground transition-colors">
                            {project.name}
                        </Link>
                        <span>/</span>
                        <span className="text-foreground font-medium">Settings</span>
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-card p-6 rounded-xl border border-border">
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                                Project Settings
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Manage your project information and integrations.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
                            {project.status === "completed" && (
                                <Button asChild className="w-full md:w-auto">
                                    <Link to={`/projects/${project.id}/docs`}>
                                        <BookOpen className="mr-2 h-4 w-4" />
                                        View Documentation
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>

                    {(slackStatus === "success" || slackStatus === "error") && (
                        <div
                            className={`rounded-lg border px-4 py-3 text-sm ${slackStatus === "success"
                                ? "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400"
                                : "border-destructive/30 bg-destructive/10 text-destructive"
                                }`}
                        >
                            {slackStatus === "success"
                                ? `Slack connected${slackWorkspace ? ` to ${slackWorkspace}` : ""}.`
                                : (slackMessage ?? "Slack connection failed. Please try again.")}
                        </div>
                    )}

                    <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="general" className="gap-2">
                                <Settings className="h-4 w-4" />
                                General
                            </TabsTrigger>
                            <TabsTrigger value="integrations" className="gap-2">
                                <Zap className="h-4 w-4" />
                                Integrations
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="general" className="space-y-6 mt-2">
                            {isOwner ? (
                                <ProjectGeneralSettings project={project} onProjectUpdate={handleProjectUpdate} />
                            ) : (
                                <Card className="shadow-none">
                                    <CardContent className="pt-6">
                                        <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
                                            Only project owners can modify general settings for this project.
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        <TabsContent value="integrations" className="space-y-6">
                            <Card className="shadow-none">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Zap className="h-5 w-5" />
                                        Integrations
                                    </CardTitle>
                                    <CardDescription>
                                        Integrations are configured per project. Connect external tools and services.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {isOwner ? (
                                        <SlackIntegrationSettings projectId={project.id} />
                                    ) : (
                                        <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
                                            Only project owners can manage integrations for this project.
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
