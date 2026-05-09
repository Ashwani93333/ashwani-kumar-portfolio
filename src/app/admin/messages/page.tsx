

"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Trash2,
  MessageSquare,
  Eye,
  Mail,
  Calendar,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
}

export default function ManageMessages() {
  const { toast } = useToast();

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [viewingMessage, setViewingMessage] =
    useState<ContactMessage | null>(null);
  const [loading, setLoading] = useState(true);

  const api = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contact`;

  /**
   * GET TOKEN FROM LOCAL STORAGE
   */
  const getToken = () => localStorage.getItem("accessToken");

  /**
   * AUTH HEADERS
   */
  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  });

  /**
   * FETCH CONTACT MESSAGES
   */
  const fetchMessages = async () => {
    try {
      const token = getToken();

      if (!token) {
        toast({
          title: "Unauthorized",
          description: "Please login first.",
          variant: "destructive",
        });
        return;
      }

      setLoading(true);

      const response = await fetch(api, {
        method: "GET",
        headers: authHeaders(),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();
      setMessages(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to load contact messages.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * DELETE CONTACT MESSAGE
   */
  const handleDelete = async (id: number) => {
    try {
      const token = getToken();

      if (!token) {
        toast({
          title: "Unauthorized",
          description: "Login required.",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch(`${api}/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      setMessages((prev) => prev.filter((msg) => msg.id !== id));

      toast({
        title: "Message Deleted",
        description: "Inquiry has been removed successfully.",
      });
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: "Unable to delete message.",
        variant: "destructive",
      });
    }
  };

  /**
   * INITIAL LOAD
   */
  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-headline font-bold">
            Inbound Messages
          </h2>
          <p className="text-xs text-muted-foreground">
            Inquiries from your portfolio contact form
          </p>
        </div>
      </div>

      <Card className="glass-card border-white/5">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin w-6 h-6 text-primary" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-xs">Sender</TableHead>
                <TableHead className="text-xs">Message Preview</TableHead>
                <TableHead className="text-xs">Received</TableHead>
                <TableHead className="text-right text-xs">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {messages.length > 0 ? (
                messages.map((m) => (
                  <TableRow
                    key={m.id}
                    className="border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] text-primary font-bold">
                          {m.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-medium">{m.name}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {m.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-xs max-w-[250px] truncate">
                      {m.message}
                    </TableCell>

                    <TableCell className="text-[10px] text-muted-foreground">
                      {new Date(m.date).toLocaleString()}
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 hover:bg-white/10"
                          onClick={() => setViewingMessage(m)}
                        >
                          <Eye className="w-3 h-3 text-primary" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 hover:bg-destructive/10"
                          onClick={() => handleDelete(m.id)}
                        >
                          <Trash2 className="w-3 h-3 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-8 text-sm text-muted-foreground"
                  >
                    No messages found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* MESSAGE DETAIL DIALOG */}
      <Dialog
        open={!!viewingMessage}
        onOpenChange={() => setViewingMessage(null)}
      >
        <DialogContent className="glass-card border-white/10">
          <DialogHeader>
            <DialogTitle className="text-lg font-headline flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              Message Detail
            </DialogTitle>
          </DialogHeader>

          {viewingMessage && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase text-muted-foreground font-semibold">
                    From
                  </p>
                  <p className="text-xs font-medium flex items-center gap-2">
                    <Mail className="w-3 h-3" />
                    {viewingMessage.name} ({viewingMessage.email})
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] uppercase text-muted-foreground font-semibold">
                    Date
                  </p>
                  <p className="text-xs font-medium flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {new Date(viewingMessage.date).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[10px] uppercase text-muted-foreground font-semibold mb-2">
                  Message
                </p>
                <p className="text-xs leading-relaxed whitespace-pre-wrap">
                  {viewingMessage.message}
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  size="sm"
                  onClick={() => setViewingMessage(null)}
                  className="text-xs"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}