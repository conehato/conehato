"use client"

import { ArticleEntity } from "@/models";
import { ThumbsUp } from "lucide-react";
import { Button } from "../ui/button";
import { postLike } from "@/services/article/postLike";

export async function ArticleLikeForm({article} : {article: ArticleEntity}) {
    return (
        <div className="flex justify-center w-full py-4">
            <Button variant="outline" onClick={() => postLike(article)}>
                <ThumbsUp className="h-3 w-3"/> {article.isLiked ? "추천 1" : "추천 0"}
            </Button>
        </div>
    )
}