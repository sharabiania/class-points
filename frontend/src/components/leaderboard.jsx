export function Leaderboard({students}) {
  console.log('leaders: ', students);
  return (<table>
    <tbody>
    {
      students.map(x => 
        <tr key={x.name}>
          <td>{x.name}</td>
          <td>{x['sum(point_types.point_value)']}</td>
        </tr>)
    }
    </tbody>
  </table>)
}