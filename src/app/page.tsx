"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function LevenshteinCalculator() {
  const [expertScores, setExpertScores] = useState<string[]>(Array(20).fill(""))
  const [candidateScores, setCandidateScores] = useState<string[]>(Array(20).fill(""))

  const calculateError = (expert: number[], candidate: number[]): number => {
    let totalError = 0
    const maxLength = Math.max(expert.length, candidate.length)

    for (let i = 0; i < maxLength; i++) {
      if (i < expert.length && i < candidate.length) {
        totalError += Math.abs(expert[i] - candidate[i])
      } else if (i < expert.length) {
        totalError += expert[i]
      } else if (i < candidate.length) {
        totalError += candidate[i]
      }
    }

    return totalError
  }

  const result = useMemo(() => {
    const expert = expertScores.map(Number).filter((score) => !isNaN(score))
    const candidate = candidateScores.map(Number).filter((score) => !isNaN(score))
    return calculateError(expert, candidate)
  }, [expertScores, candidateScores]) // Removed calculateError from dependencies

  const updateScore = (type: "expert" | "candidate", index: number, value: string) => {
    const sanitizedValue = value.replace(/[^\d.]/g, "")
    const parts = sanitizedValue.split(".")
    if (parts.length > 2) return
    if (Number(sanitizedValue) > 1) return

    if (type === "expert") {
      const newScores = [...expertScores]
      newScores[index] = sanitizedValue
      setExpertScores(newScores)
    } else {
      const newScores = [...candidateScores]
      newScores[index] = sanitizedValue
      setCandidateScores(newScores)
    }
  }

  const addScore = (type: "expert" | "candidate") => {
    if (type === "expert") {
      setExpertScores([...expertScores, ""])
    } else {
      setCandidateScores([...candidateScores, ""])
    }
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="space-y-4">
            <CardTitle>FIG RG Exam Results Calculation</CardTitle>
            <div className="border-t pt-4">
              <p className="text-base font-medium">Developed by Viviana Luzando and Francisco Cuadra, Uruguay 🇺🇾</p>
              <p className="text-sm text-muted-foreground">For any inquiries: vivianaluzardoabraham@gmail.com</p>
            </div>
          </div>
          <CardDescription className="mt-4">
            Enter expert and candidate scores to calculate the total error.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Expert Scores</Label>
              <div className="flex flex-wrap gap-2">
                {expertScores.map((score, index) => (
                  <Input
                    key={index}
                    type="text"
                    value={score}
                    onChange={(e) => updateScore("expert", index, e.target.value)}
                    className="w-20"
                  />
                ))}
                <Button variant="outline" size="sm" onClick={() => addScore("expert")}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Candidate Scores</Label>
              <div className="flex flex-wrap gap-2">
                {candidateScores.map((score, index) => (
                  <Input
                    key={index}
                    type="text"
                    value={score}
                    onChange={(e) => updateScore("candidate", index, e.target.value)}
                    className="w-20"
                  />
                ))}
                <Button variant="outline" size="sm" onClick={() => addScore("candidate")}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Result</Label>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Total Error</TableCell>
                    <TableCell>{result.toFixed(2)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}