import { projectTypes } from '@/commontypes';
import React, { useEffect, useState } from 'react'
import Select, { ActionMeta, createFilter } from 'react-select';
import { Label } from 'reactstrap'

const TaskFilter: React.FC<{
    ProjectId: { id: string, label: string }, setProjectId: React.Dispatch<React.SetStateAction<{
        id: string;
        label: string;
    }>>, projects: any
}> = ({ ProjectId, setProjectId, projects }) => {
    const [projectsList, setprojectsList] = useState([])

    useEffect(() => {
        if (projects?.data?.data?.projects?.length as any) {
            setprojectsList(projects?.data?.data?.projects.map((_project: projectTypes) => ({
                value: _project._id, label: _project.title as string,
            })))
        }
    }, [projects])
    const handleChange = (data: { value: string, label: string }, action: ActionMeta<undefined>) => {
        switch (action.action) {
            case 'select-option': {
                setProjectId({ id: data.value, label: data.label })
                break;
            }
            case 'clear': {
                setProjectId({ id: "", label: "" })
                break
            }
        }
    };
    return (
        <div className='w-100 wrapper justify-end p-2 '>
            <Select
                closeMenuOnSelect={true}
                filterOption={createFilter({
                    matchFrom: 'any',
                    ignoreCase: true,
                    stringify: option => `${option.label}`,
                })}
                placeholder="Select Project"
                isSearchable
                classNamePrefix="react-select-multi"
                isClearable={true}
                options={[{ label: "All Task", value: "" }, ...projectsList]}
                value={projectsList?.find((elem) => elem.value === ProjectId.id)}
                name='projectId'
                onChange={(e, action) => {
                    handleChange(e, action)
                }}
            />
        </div>
    )
}

export default TaskFilter