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
  }, [expertScores, candidateScores])

  const updateScore = (type: "expert" | "candidate", index: number, value: string) => {
    const sanitizedValue = value.replace(/[^\d.]/g, "")
    const parts = sanitizedValue.split(".")
    if (parts.length > 3) return
  
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
              <p className="text-base font-medium">Developed by Viviana Luzardo and Francisco Cuadra, Uruguay 🇺🇾</p>
              <p className="text-sm text-muted-foreground">For any inquiries: vivianaluzardoa@gmail.com</p>
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
              <Label className="text-xl font-bold">Result</Label>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-xl font-bold">Total Error</TableCell>
                    <TableCell className="text-xl font-bold">{result.toFixed(2)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="mt-8">
                <Label>Reference Table</Label>
                <ScrollArea className="rounded-md border mt-2">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center">Total Error</TableHead>
                        <TableHead className="text-center">RGI DB</TableHead>
                        <TableHead className="text-center">RGI DA</TableHead>
                        <TableHead className="text-center">RGG DB</TableHead>
                        <TableHead className="text-center">RGG DA</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { error: "0.0", rgiDb: "100%", rgiDa: "100%", rggDb: "100%", rggDa: "100%" },
                        { error: "0.1", rgiDb: "100%", rgiDa: "100%", rggDb: "100%", rggDa: "100%" },
                        { error: "0.2", rgiDb: "100%", rgiDa: "100%", rggDb: "100%", rggDa: "100%" },
                        { error: "0.3", rgiDb: "95%", rgiDa: "95%", rggDb: "95%", rggDa: "95%" },
                        { error: "0.4", rgiDb: "95%", rgiDa: "95%", rggDb: "95%", rggDa: "95%" },
                        { error: "0.5", rgiDb: "90%", rgiDa: "90%", rggDb: "90%", rggDa: "90%" },
                        { error: "0.6", rgiDb: "90%", rgiDa: "90%", rggDb: "90%", rggDa: "90%" },
                        { error: "0.7", rgiDb: "85%", rgiDa: "85%", rggDb: "85%", rggDa: "85%" },
                        { error: "0.8", rgiDb: "85%", rgiDa: "85%", rggDb: "85%", rggDa: "85%" },
                        { error: "0.9", rgiDb: "80%", rgiDa: "80%", rggDb: "80%", rggDa: "80%" },
                        { error: "1.0", rgiDb: "80%", rgiDa: "75%", rggDb: "80%", rggDa: "80%" },
                        { error: "1.1", rgiDb: "75%", rgiDa: "75%", rggDb: "75%", rggDa: "75%" },
                        { error: "1.2", rgiDb: "75%", rgiDa: "70%", rggDb: "75%", rggDa: "75%" },
                        { error: "1.3", rgiDb: "70%", rgiDa: "65%", rggDb: "70%", rggDa: "70%" },
                        { error: "1.4", rgiDb: "70%", rgiDa: "65%", rggDb: "70%", rggDa: "70%" },
                        { error: "1.5", rgiDb: "65%", rgiDa: "60%", rggDb: "65%", rggDa: "65%" },
                        { error: "1.6", rgiDb: "65%", rgiDa: "55%", rggDb: "65%", rggDa: "65%" },
                        { error: "1.7", rgiDb: "60%", rgiDa: "55%", rggDb: "60%", rggDa: "60%" },
                        { error: "1.8", rgiDb: "55%", rgiDa: "50%", rggDb: "55%", rggDa: "55%" },
                        { error: "1.9", rgiDb: "55%", rgiDa: "45%", rggDb: "55%", rggDa: "55%" },
                        { error: "2.0", rgiDb: "50%", rgiDa: "45%", rggDb: "50%", rggDa: "50%" },
                        { error: "2.1", rgiDb: "45%", rgiDa: "40%", rggDb: "45%", rggDa: "45%" },
                        { error: "2.2", rgiDb: "45%", rgiDa: "35%", rggDb: "45%", rggDa: "45%" },
                        { error: "2.3", rgiDb: "40%", rgiDa: "35%", rggDb: "40%", rggDa: "40%" },
                        { error: "2.4", rgiDb: "35%", rgiDa: "30%", rggDb: "35%", rggDa: "35%" },
                        { error: "2.5", rgiDb: "35%", rgiDa: "25%", rggDb: "35%", rggDa: "35%" },
                        { error: "2.6", rgiDb: "30%", rgiDa: "25%", rggDb: "30%", rggDa: "30%" },
                        { error: "2.7", rgiDb: "25%", rgiDa: "20%", rggDb: "25%", rggDa: "25%" },
                        { error: "2.8", rgiDb: "25%", rgiDa: "15%", rggDb: "25%", rggDa: "25%" },
                        { error: "2.9", rgiDb: "20%", rgiDa: "15%", rggDb: "20%", rggDa: "20%" },
                        { error: "3.0", rgiDb: "15%", rgiDa: "10%", rggDb: "15%", rggDa: "15%" },
                        { error: "3.1", rgiDb: "15%", rgiDa: "5%", rggDb: "15%", rggDa: "15%" },
                        { error: "3.2", rgiDb: "10%", rgiDa: "5%", rggDb: "10%", rggDa: "10%" },
                        { error: "3.3", rgiDb: "5%", rgiDa: "0%", rggDb: "5%", rggDa: "5%" },
                        { error: "3.4", rgiDb: "5%", rgiDa: "", rggDb: "5%", rggDa: "5%" },
                        { error: "3.5", rgiDb: "0%", rgiDa: "", rggDb: "0%", rggDa: "0%" },
                      ].map((row, i) => (
                        <TableRow key={i}>
                          <TableCell className="text-center">{row.error}</TableCell>
                          <TableCell className="text-center">{row.rgiDb}</TableCell>
                          <TableCell className="text-center">{row.rgiDa}</TableCell>
                          <TableCell className="text-center">{row.rggDb}</TableCell>
                          <TableCell className="text-center">{row.rggDa}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}