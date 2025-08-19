import React, { useState } from 'react'
import { type Template } from '@/newtab/schemas/template.schema'
import { TemplateCard } from './TemplateCard'
import { TemplatePreviewModal } from './TemplatePreviewModal'
import TEMPLATES from '@/newtab/data/templates'

interface TemplateGridProps {
  onUseTemplate: (template: Template) => void
}

export function TemplateGrid ({ onUseTemplate }: TemplateGridProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)

  const handleUseTemplate = (template: Template): void => {
    setSelectedTemplate(null)
    onUseTemplate(template)
  }

  return (
    <>
      <section>
        <h2 className='text-[18px] font-semibold tracking-tight mb-4'>Agent templates</h2>
        <div className='grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
          {TEMPLATES.map(template => (
            <TemplateCard
              key={template.id}
              template={template}
              onPreview={setSelectedTemplate}
              onUse={onUseTemplate}
            />
          ))}
        </div>
      </section>

      {/* Template Preview Modal */}
      {selectedTemplate && (
        <TemplatePreviewModal
          template={selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
          onUse={handleUseTemplate}
        />
      )}
    </>
  )
}