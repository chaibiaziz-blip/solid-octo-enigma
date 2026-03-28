import React from 'react';
import {
    Box,
    Heading,
    TablePickerSynced,
    ViewPickerSynced,
    FieldPickerSynced,
    useRecords,
    useBase,
    useGlobalConfig,
    Text,
} from '@airtable/blocks/ui';

const TABLE_KEY = 'selectedTableId';
const VIEW_KEY = 'selectedViewId';

function RecordList({table, view}) {
    const records = useRecords(view || table);

    if (!records || records.length === 0) {
        return <Text padding={3} textColor="gray">No records found.</Text>;
    }

    return (
        <Box>
            {records.map((record) => (
                <Box
                    key={record.id}
                    padding={2}
                    marginBottom={1}
                    border="default"
                    borderRadius="large"
                    backgroundColor="white"
                >
                    <Text fontWeight="500">{record.name || record.id}</Text>
                </Box>
            ))}
        </Box>
    );
}

export default function App() {
    const base = useBase();
    const globalConfig = useGlobalConfig();

    const tableId = globalConfig.get(TABLE_KEY);
    const viewId = globalConfig.get(VIEW_KEY);

    const table = base.getTableByIdIfExists(tableId);
    const view = table ? table.getViewByIdIfExists(viewId) : null;

    return (
        <Box padding={3}>
            <Heading marginBottom={2}>Client List</Heading>

            <Box marginBottom={2}>
                <Text marginBottom={1} fontWeight="500">Table</Text>
                <TablePickerSynced globalConfigKey={TABLE_KEY} />
            </Box>

            {table && (
                <Box marginBottom={2}>
                    <Text marginBottom={1} fontWeight="500">View</Text>
                    <ViewPickerSynced table={table} globalConfigKey={VIEW_KEY} />
                </Box>
            )}

            {table && (
                <Box marginTop={3}>
                    <RecordList table={table} view={view} />
                </Box>
            )}

            {!table && (
                <Text textColor="gray">Select a table above to get started.</Text>
            )}
        </Box>
    );
}
