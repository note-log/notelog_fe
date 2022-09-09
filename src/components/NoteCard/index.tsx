import { Card, CardContent, Typography } from "@mui/material";

/*
 * @Author: SnowWarri0r
 * @LastModifiedBy: SnowWarri0r
 * @GithubUser: SnowWarri0r
 * @Date: 2022-09-09 18:06:35
 * @Company: ncuhome
 * @LastEditTime: 2022-09-09 19:03:06
 * @FilePath: \notelog_fe\src\components\NoteCard\index.tsx
 * @Description:
 */
interface Props {
  content: string;
}
export default function NoteCard(props: Props) {
  return (
    <Card>
      <CardContent>
        <Typography variant="body2">{props.content}</Typography>
      </CardContent>
    </Card>
  );
}
