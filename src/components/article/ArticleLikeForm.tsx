"use client"

import { useState } from 'react'
import { ArticleEntity } from "@/models";
import { ThumbsUp } from "lucide-react";
import { Button } from "../ui/button";
import { postLike } from "@/services/article";

export function ArticleLikeForm({article, userId} : {article: ArticleEntity, userId: string}) {
    const [isLiked, setIsLiked] = useState(article.likes.includes(userId));

    return (
        <div className="flex justify-center w-full py-4">
            <Button variant={isLiked ? 'outlineDark' : 'outline'} onClick={() => {
                postLike(article, userId)
                setIsLiked(liked => !liked)
                }}>
                <ThumbsUp className="h-4 w-4 mr-1 text-base"/> {`추천 ${article.likes.length + (article.likes.includes(userId) ? Number(isLiked) - 1 : Number(isLiked))}`}
            </Button>
        </div>
    )
}